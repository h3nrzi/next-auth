export default interface FormState {
  errors: {
    email?: string[];
    password?: string[];
    server?: string;
  };
}
