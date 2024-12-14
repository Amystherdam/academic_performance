interface IProps {
  name: string;
}

export default function Student(props: IProps) {
  const { name } = props;

  return <p>{name}</p>;
}
