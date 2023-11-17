interface Descriptor {
  id: string;
  sdfName: string;
  yValues: string[];
  status: "AWAITING" | "RUNNING" | "ERRORED" | "SUCCESS";
  error?: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
