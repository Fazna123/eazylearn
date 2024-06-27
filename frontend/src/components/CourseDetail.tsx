import { useEffect, useState } from "react";
import { getSingleCourse, getStripeKey, newPayment } from "../utils/endPoint";
import Spinner from "./Spinner";
import Header from "./Header";
import Footer from "./Footer";
import CourseDetailView from "./CourseDetailView";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetail = ({ id }: Props) => {
  //const [route, setRoute] = useState("Login");
  //const [open, setOpen] = useState(false);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [configData, setConfigData] = useState({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  //const publishableKey = configData;

  useEffect(() => {
    const fetchDataAndPayment = async (id: string) => {
      try {
        // Fetch course data
        console.log("fetch payment called");
        const { success, error, data } = await getSingleCourse(id);
        if (success) {
          setCourse(data?.course);
          // Proceed with payment if course data is successfully fetched
          const amount = Math.round(data.course.price * 100);
          console.log("amount", amount);
          const paymentResponse = await newPayment(amount);
          if (paymentResponse.success) {
            console.log("paymentResponse", paymentResponse.data);
            setClientSecret(paymentResponse.data.client_secret);
            setLoading(false); // Set loading to false after payment is done
          } else {
            console.log(paymentResponse.error);
            setLoading(false); // Set loading to false in case of payment error
          }
        } else {
          console.log(error);
          setLoading(false); // Set loading to false in case of course fetch error
        }
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false in case of any unexpected error
      }
    };

    // if (!course) {
    //   // Fetch data and initiate payment only if course data is not already available
    //   setLoading(true); // Set loading to true while fetching data and making payment
    //   fetchDataAndPayment(id);
    // }
    fetchDataAndPayment(id);
  }, []); // Add id and course to the dependency array

  useEffect(() => {
    const fetchDataConfig = async () => {
      const { success, publishableKey } = await getStripeKey();
      if (success) {
        setConfigData(publishableKey);
        setStripePromise(loadStripe(publishableKey));
        console.log(configData);
      }
    };
    fetchDataConfig();
  }, []);

  // useEffect(() => {
  //   if (course) {
  //     const doPayment = async () => {
  //       const amount = Math.round(course.price * 100);
  //       const { success, data, error } = await newPayment(amount);
  //       if (success) {
  //         setClientSecret(data.client_secret);
  //         console.log(data);
  //       } else {
  //         console.log(error);
  //       }
  //     };
  //     doPayment();
  //   }
  // });

  // useEffect(() => {
  //   const fetchData = async (id: string) => {
  //     const { success, error, data } = await getSingleCourse(id);

  //     if (success) {
  //       setCourse(data?.course);
  //       console.log(data);
  //     } else {
  //       console.log(error);
  //     }
  //   };
  //   fetchData(id);
  // }, []);
  return (
    <>
      {loading ? (
        Spinner
      ) : (
        <div>
          <Header />
          {/* <CourseDetailView data={course} /> */}
          {stripePromise && (
            <CourseDetailView
              data={course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetail;
