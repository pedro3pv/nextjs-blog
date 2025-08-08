import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  dateString: string;
};

export default function DateFormatter({ dateString }: Props) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "d 'de' LLLL 'de' yyyy", { locale: ptBR })}
    </time>
  );
}
