import { Octokit } from "octokit";

// Definição da interface para o objeto de retorno
interface FileCommitInfo {
  name: string | undefined;
  date: string | undefined;
  sha: string;
}

interface FileHistoryInfo {
  file: string;
  creator: FileCommitInfo;
  lastEditor: FileCommitInfo;
}

// Configure com seu token de acesso pessoal para evitar limites de taxa
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, // O token deve estar definido no arquivo .env
});

export async function getFileCommitHistory(
  owner: string,
  repo: string,
  path: string
): Promise<FileHistoryInfo | null> {
  try {
    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      path, // O caminho para o arquivo específico
    });

    if (commits.length === 0) {
      console.warn(`Nenhum commit encontrado para o arquivo: ${path}`);
      return null; // Retorna null se não encontrar commits
    }

    // O primeiro commit na lista é o mais recente (última edição)
    const lastCommit = commits[0];

    // O último commit na lista é o mais antigo (criação do arquivo)
    const firstCommit = commits[commits.length - 1];

    // Monta o objeto de retorno
    const historyInfo: FileHistoryInfo = {
      file: path,
      creator: {
        name: firstCommit.commit.author?.name || firstCommit.author?.login,
        date: firstCommit.commit.author?.date,
        sha: firstCommit.sha,
      },
      lastEditor: {
        name: lastCommit.commit.author?.name || lastCommit.author?.login,
        date: lastCommit.commit.author?.date,
        sha: lastCommit.sha,
      },
    };

    return historyInfo;
  } catch (error) {
    console.error("Erro ao buscar o histórico de commits do arquivo:", error);
    return null; // Retorna null em caso de erro
  }
}

// // --- Exemplo de uso ---
// async function main() {
//   const fileHistory = await getFileCommitHistory(
//     "pedro3pv",
//     "nextjs-blog",
//     "_posts/hello-world.md" // Exemplo com um arquivo do repositório do Next.js
//   );

//   if (fileHistory) {
//     // Converte o objeto para uma string JSON formatada para exibição
//     const jsonOutput = JSON.stringify(fileHistory, null, 2);

//     console.log("Resultado em formato JSON:");
//     console.log(jsonOutput);
//   } else {
//     console.log("Não foi possível obter o histórico do arquivo.");
//   }
// }

// main();