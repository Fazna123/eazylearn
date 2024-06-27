import { FC, useState } from "react";
import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createOrder } from "../utils/endPoint";
//import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import socketIO from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_PUBLIC_BASE_API;

const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm: FC<Props> = ({ data, user }: Props) => {
  const navigate = useNavigate();
  const course = data;
  const stripe = useStripe();
  const elements = useElements();
  const [orderData, setOrderData] = useState({});
  const [message, setMessage] = useState<any>("");
  //const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<any>({});
  //const { currentUser } = useSelector((state: any) => state.user);
  //const [createOrder, { data: orderData, error }] = useCreateOrderMutation();

  //const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    //console.log(paymentIntent?.status);
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      console.log(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      console.log(shippingAddress);
      setIsLoading(false);
      const { success, data, error } = await createOrder(
        course._id,
        paymentIntent
      );
      console.log(success, data, error);
      if (success) {
        setOrderData(data);
        socketId.emit("notification", {
          title: "New Order",
          message: `A new order recieved for course ${course?.name}`,
          userId: user._id,
        });
        console.log(orderData);
        navigate(`/course-access/${course._id}`);
      }
      if (error) {
        if ("data" in error) {
          const errorMessage = error as any;
          toast.error(errorMessage.data.message);
        }
      }
    }
  };

  //   useEffect(() => {
  //     if (orderData) {
  //       setLoadUser(true);

  //       console.log("use effect order data", orderData);
  //       navigate(`/course-access/${course._id}`);
  //     }
  //     // if(error){
  //     //     if("data" in error){
  //     //         const errorMessage = error as any;
  //     //         toast.error(errorMessage.data.message)
  //     //     }}
  //   }, [orderData]);
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        // options={{defaultValues: {email: 'foo@bar.com'}}}
      />
      <AddressElement
        id="shipping-address-element"
        onChange={(event) => {
          setShippingAddress(event.value);
        }}
        options={{ mode: "shipping" }}
      />
      <PaymentElement id="payment-element" />
      <button
        className="bg-blue-500 rounded-full px-5 py-2 mt-5 text-white"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">{isLoading ? "Paying..." : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-[red] p-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
