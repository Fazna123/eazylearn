// interface EmailOptions {
//   email: string;
//   subject: string;
//   template: string;
//   data: { [key: string]: string | number | boolean | null | undefined };
// }

// export default EmailOptions;

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: {
    user: {
      name: string;
    };
    activationCode: string;
  };
}

export default EmailOptions;
