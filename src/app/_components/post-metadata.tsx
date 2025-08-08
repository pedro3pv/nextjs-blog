import { type Author } from "@/interfaces/author";
import DateFormatter from "./date-formatter";
import Avatar from "./avatar";
import { Calendar, User, MessageCircle, Edit3, Clock } from 'lucide-react';

type Props = {
  createdAt: string;
  creator: Author;
  lastEditDate?: string;
  lastEditor?: Author;
  lastComment?: string;
  commentCreatedAt?: string;
};

export function PostMetadata({ 
  createdAt, 
  creator, 
  lastEditDate, 
  lastEditor, 
  lastComment,
  commentCreatedAt 
}: Props) {
  return (
    <div 
      className="border rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
      style={{
        backgroundColor: "rgba(30, 30, 30, 0.6)",
        borderColor: "#595350",
      }}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Informações de Criação */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#4772b2" }}
            >
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                Data de Criação
              </p>
              <p className="text-sm text-white">
                <DateFormatter dateString={createdAt} />
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#4e994c" }}
            >
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                Criador
              </p>
              <div className="flex items-center">
                <Avatar name={creator.name} picture={creator.picture} size="sm" />
                <p className="text-sm text-white">{creator.name}</p>
              </div>
            </div>
          </div>

          {/* {commentCreatedAt && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#cc8c51" }}
              >
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                  Comentário de Criação
                </p>
                <p className="text-sm text-white">
                  <DateFormatter dateString={commentCreatedAt} />
                </p>
              </div>
            </div>
          )} */}
        </div>

        {/* Informações de Edição */}
        <div className="space-y-4">
          {lastEditDate && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4772b2" }}
              >
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                  Data da Última Edição
                </p>
                <p className="text-sm text-white">
                  <DateFormatter dateString={lastEditDate} />
                </p>
              </div>
            </div>
          )}

          {lastEditor && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4e994c" }}
              >
                <Edit3 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                  Quem Comentou a Última Edição
                </p>
                <div className="flex items-center">
                  <Avatar name={lastEditor.name} picture={lastEditor.picture} size="sm" />
                  <p className="text-sm text-white">{lastEditor.name}</p>
                </div>
              </div>
            </div>
          )}

          {/* {lastComment && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4e994c" }}
              >
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                  Comentário da Última Edição
                </p>
                <p className="text-sm" style={{ color: "#bfbbb5" }}>
                  {lastComment}
                </p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
