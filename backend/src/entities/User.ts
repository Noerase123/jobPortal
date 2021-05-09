import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
    name: 'tbl_users'
})
export class User {

    @PrimaryGeneratedColumn()
    user_id?: number;

    @Column()
    uuid: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    location: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    date_created: Date

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    last_login: Date

    @Column()
    is_deleted: number;

    constructor(uuid: string, firstName: string, lastName: string, location: string, email: string, phone_number: string, username: string, password: string, date_created: Date, last_login: Date, is_deleted: number) {
        this.uuid = uuid
        this.firstName = firstName
        this.lastName = lastName
        this.location = location
        this.email = email
        this.phone_number = phone_number
        this.username = username
        this.password = password
        this.date_created = date_created
        this.is_deleted = is_deleted
        this.last_login = last_login
    }
}