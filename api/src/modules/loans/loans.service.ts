import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanRepository } from 'src/shared/database/repositories/loan.repositories';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { CompanyRepository } from 'src/shared/database/repositories/company.repositories';
import { LoanInstallmentRepository } from 'src/shared/database/repositories/installment.repositories';
import { handleError } from 'src/utils/erroHandler';
import { addMonths } from 'date-fns';
import dayjs from 'dayjs';

@Injectable()
export class LoansService {
  constructor(
    private loanRepository: LoanRepository,
    private companyRepository: CompanyRepository,
    private loanInstallmentRepository: LoanInstallmentRepository,
    private usersRepository: UsersRepository,
  ) {}

  async requestLoan(createLoanDto: CreateLoanDto, userId: string) {
    const { amount, installmentsNumber } = createLoanDto;
    const employee = await this.usersRepository.findUnique({
      where: { id: userId },
      include: {
        company: true,
      },
    });

    if (!employee) throw new NotFoundException('Funcionário não encontrado');

    const company = await this.companyRepository.findFirst({
      where: { id: employee.companyId },
    });
    if (!company.arrangement) {
      throw new BadRequestException(
        'Funcionário não está em empresa conveniada',
      );
    }
    // 🔹 Verifica margem consignável
    const maxLoan = Number(employee.salary) * 0.35;
    if (amount > maxLoan) {
      throw new BadRequestException(
        `Valor solicitado acima da margem. Máximo permitido: R$ ${maxLoan.toFixed(2)}`,
      );
    }

    // 🔹 Verifica score
    const { score } = await this.getCreditScore();
    const minScore = this.getMinScore(Number(employee.salary));
    if (score < minScore) {
      await this.loanRepository.create({
        data: {
          userId: userId,
          amount,
          status: 'denied',
          companyName: company.companyName,
          nextDueDate: addMonths(new Date(), 1),
          installmentNumber: installmentsNumber,
        },
      });
      return {
        status: 'rejeitado',
        motivo: `Score insuficiente. Score mínimo necessário: ${minScore}, atual: ${score}`,
      };
    }

    // 🔹 Processa pagamento (mock)
    const payment = await this.processPayment(amount);
    if (payment.status !== 'aprovado') {
      throw new BadRequestException('Falha ao processar pagamento');
    }
    const loan = await this.loanRepository.create({
      data: {
        userId: userId,
        amount,
        status: 'approved',
        companyName: company.companyName,
        nextDueDate: addMonths(new Date(), 1),
        installmentNumber: installmentsNumber,
      },
    });

    const installmentsArr = this.generateInstallments(
      amount,
      installmentsNumber,
      loan.requestedAt,
      loan.id,
    );
    console.log(
      '🚀 ~ LoansService ~ requestLoan ~ installmentsArr:',
      installmentsArr,
    );

    const installment = amount / installmentsNumber;

    // 🔹 Calcula datas de vencimento
    const hoje = new Date();
    const duesDates = [];
    for (let i = 1; i <= installmentsNumber; i++) {
      const venc = new Date(hoje);
      venc.setMonth(venc.getMonth() + i);
      duesDates.push(venc.toISOString().split('T')[0]);
    }

    await this.loanInstallmentRepository.createMany({
      data: installmentsArr,
    });

    return {
      status: 'aprovado',
      loanId: loan.id,
      amount,
      installmentsNumber,
      installment,
      duesDates,
    };
  }

  async findLoansById(userId: string) {
    try {
      return await this.loanRepository.findMany({
        where: { userId },
      });
    } catch (error) {
      handleError("Não foi possivel encontrar empréstimos")
    }
  }

  private generateInstallments(
    amount: number,
    installments: number,
    requestedAt = new Date(),
    loanId: string,
  ) {
    const list = [];
    for (let i = 1; i <= installments; i++) {
      const due = dayjs(requestedAt).add(i, 'month').toDate(); // first = +1 month
      list.push({
        loanId,
        installmentNumber: i,
        dueDate: due,
        amount: Number((amount / installments).toFixed(2)),
      });
    }
    return list;
  }

  async calculateMaxLoan(userId: string) {
    const user = await this.usersRepository.findUnique({
      where: { id: userId },
    });
    const maxLoan = Number(user.salary) * 0.35;
    const maxParcela = Number(maxLoan.toFixed(2));
    return { maxLoan, allowedInstallments: [1, 2, 3, 4], maxParcela };
  }

  private async getCreditScore(): Promise<{ score: number }> {
    return { score: 1000 }; // fixo, já que o link não funciona
  }

  private async processPayment(amount: number): Promise<{ status: string }> {
    return { status: 'aprovado' }; // fixo
  }

  private getMinScore(salary: number): number {
    if (salary <= 2000) return 400;
    if (salary <= 4000) return 500;
    if (salary <= 8000) return 600;
    if (salary <= 12000) return 700;
    return 750; // para salários acima
  }
}
