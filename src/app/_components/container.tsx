type Props = {
  children?: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="container mx-auto px-4 py-8">{children}</div>;
}
