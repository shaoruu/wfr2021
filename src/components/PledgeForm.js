import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.section``;

const Form = styled.form``;

const PledgeForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input name="example" defaultValue="test" ref={register} />

        {/* include validation with required or other standard HTML validation rules */}
        <input name="exampleRequired" ref={register({ required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </Form>
    </Wrapper>
  );
};

export default PledgeForm;
