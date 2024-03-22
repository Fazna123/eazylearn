interface ICoupon extends Document {
  code: string;
  value: number;
  from: Date;
  to: Date;
}
export default ICoupon;
