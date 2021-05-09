import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'tbl_jobs'
})
export class Job {

  @PrimaryGeneratedColumn()
  job_id?: number;

  @Column()
  uuid: string;

  @Column()
  title: string

  @Column('text')
  description: string

  @Column({
    length: 50
  })
  payment_amount: string

  @Column()
  city: string

  @Column()
  state: string

  @Column({
    length: 50
  })
  email: string

  @Column({
    length: 50
  })
  phone_number: string

  @Column()
  address: string

  @Column({
    length: 50
  })
  poster_name: string

  @Column('timestamp',{
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  date_created: Date

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  date_updated: Date

  @Column('int')
  is_deleted: number

  constructor(uuid: string, title: string, description: string,
    payment_amount: string, city: string, state: string, email: string,
    phone_number: string, address: string, poster_name: string, date_created: Date, date_updated: Date, is_deleted: number) {
    // this.job_id = job_id
    this.uuid = uuid
    this.title = title
    this.description = description
    this.payment_amount = payment_amount
    this.city = city
    this.state = state
    this.email = email
    this.phone_number = phone_number
    this.address = address
    this.poster_name = poster_name
    this.date_created = date_created
    this.date_updated = date_updated
    this.is_deleted = is_deleted
  }

}