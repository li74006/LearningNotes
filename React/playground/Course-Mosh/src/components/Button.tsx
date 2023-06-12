interface Props {
  name: string;
  type?: "primary" | "success" | "danger" | "warning";
  onClick: () => void;
}

const Button = ({ name, type, onClick }: Props) => {
  return (
    <button className={"btn btn-" + type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
