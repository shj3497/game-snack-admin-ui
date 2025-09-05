'use client';

import {createContext, FC, ReactNode, use, useState} from 'react';
import UploadButton, {UploadButtonProps} from './UploadButton.client';
import {Box, BoxProps} from '@mui/material';

interface Props extends BoxProps {
  children: ReactNode;
}

interface InputFileContextProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const InputFileContext = createContext<InputFileContextProps | undefined>(
  undefined,
);

const useInputFileContext = () => {
  const context = use(InputFileContext);
  if (!context) {
    throw new Error(
      'useInputFileContext must be used within an InputFileProvider',
    );
  }
  return context;
};

interface InputFileProviderProps {
  children: ReactNode;
}

const InputFileProvider: FC<InputFileProviderProps> = ({children}) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <InputFileContext.Provider value={{files, setFiles}}>
      {children}
    </InputFileContext.Provider>
  );
};

const Button: FC<UploadButtonProps> = ({onFileChange, ...props}) => {
  const {setFiles} = useInputFileContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    setFiles(selectedFiles);
    onFileChange?.(event);
    console.log(selectedFiles);
  };

  return <UploadButton {...props} onFileChange={handleFileChange} />;
};

type FileNamesProps = {} & BoxProps;
const FileNames: FC<FileNamesProps> = ({...props}) => {
  const {files} = useInputFileContext();

  return (
    <Box {...props}>
      {files.map((file, index) => (
        <div key={index} className="file-item">
          {file.name}
        </div>
      ))}
    </Box>
  );
};

type FilePreviewProps = {} & BoxProps;

const FilePreview: FC<FilePreviewProps> = ({...props}) => {
  const {files} = useInputFileContext();

  return (
    <Box {...props}>
      {files.map((file, index) => (
        <img
          key={index}
          className="file-img"
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{width: '100%', height: '100%'}}
        />
      ))}
    </Box>
  );
};

type InputFileProps = {
  Button: FC<UploadButtonProps>;
  FileNames: FC<FileNamesProps>;
  FilePreview: FC<FilePreviewProps>;
} & FC<Props>;

const InputFile: InputFileProps = ({children, ...props}) => {
  return (
    <InputFileProvider>
      <Box {...props}>{children}</Box>
    </InputFileProvider>
  );
};

InputFile.Button = Button;
InputFile.FileNames = FileNames;
InputFile.FilePreview = FilePreview;

export default InputFile;
