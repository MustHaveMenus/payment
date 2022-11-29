interface FormattedDateProps {
  date: Date
}

const FormattedDate = (props: FormattedDateProps) => {
  return <>{props.date.toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})}</>
}
export default FormattedDate;
