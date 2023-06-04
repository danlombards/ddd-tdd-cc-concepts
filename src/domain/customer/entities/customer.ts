// UMA ENTIDADE SEMPRE DEVE SE AUTOVALIDAR
import Entity from '../../@shared/entities/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import CustomerValidatorFactory from '../factories/customer.validator.factory';
import Address from '../value-objects/address';

export default class Customer extends Entity {

  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id
    this._name = name;
    this.validate();

    if(this._notification.hasErrors()) {
      throw new NotificationError(this._notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate(): void {
    CustomerValidatorFactory.create().validate(this);
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a costumer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  isActive(): boolean {
    return this._active;
  }
}