interface IProps {
  name: string;
}

export default function Student(props: IProps): JSX.Element {
  const { name } = props;

  return <p>{name}</p>;
}
