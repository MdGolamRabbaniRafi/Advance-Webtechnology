import { AppointmentEntity } from 'src/Doctor/appointment.entitiy';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesEntity } from './Entites/employee.entity';
import { ReportsEintiy } from './Entites/report.entity';
import { EmployeeController } from './Controllers/employee.controller';
import { ReportController } from './Controllers/report.controller';
import { EmployeeService } from './Services/employee.service';
import { ReportService } from './Services/report.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './Services/email.service';
import { DoctorService } from 'src/Doctor/Doctor.service';
import { DoctorController } from 'src/Doctor/Doctor.controller';
import { DoctorEntity } from 'src/Doctor/Doctor.dto';


@Module({
  imports: [TypeOrmModule.forFeature([EmployeesEntity, ReportsEintiy,AppointmentEntity,DoctorEntity]),

  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'abcdhealthcare24@gmail.com',
                   pass: 'edmhnqgrzwkdyfik'
               },
              }
  }),

],
  controllers: [EmployeeController,ReportController],
  providers: [EmployeeService,ReportService,EmailService,DoctorService]
})
export class EmployeeModule {}
