import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';

export async function upload_embedding(filename: string, file: Blob) {
  let loader = new CustomPDFLoader(file);

  let document = await loader.load();

  /* Split text into chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await textSplitter.splitDocuments(document);
  console.log('split docs', docs);

  docs.map(doc => doc.metadata.source = filename)

  console.log('creating vector store...');
  /*create and store the embeddings in the vectorStore*/
  const embeddings = new OpenAIEmbeddings();
  const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

  //embed the PDF documents
  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: index,
    namespace: PINECONE_NAME_SPACE,
    textKey: 'text',
  });
};