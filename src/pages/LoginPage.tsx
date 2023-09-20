import { useForm } from "react-hook-form";
    
export default function Login() {
  const {
    handleSubmit,
    formState: { isDirty, isValidating },
  } = useForm{
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit((values) => console.log(values))>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>

        <div>
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>

        <button type="submit" disabled={isDirty}>Login</button>
      </form>
    </div>
  );
}
