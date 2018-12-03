import { BuyerReqModule } from './buyer-req.module';

describe('BuyerReqModule', () => {
  let buyerReqModule: BuyerReqModule;

  beforeEach(() => {
    buyerReqModule = new BuyerReqModule();
  });

  it('should create an instance', () => {
    expect(buyerReqModule).toBeTruthy();
  });
});
