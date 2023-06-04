import EventInterface from "../../@shared/events/event.interface";

interface IProductCreatedDTO {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: IProductCreatedDTO;
  
  constructor(eventData: IProductCreatedDTO) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}