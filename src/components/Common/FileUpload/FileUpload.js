import React, { useState } from 'react';
import { Upload, Button, Icon } from 'antd';

const FileUpload = props => {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const { fileName, acceptType, placeholder, fileType } = props;
  const fileProps = {
    onChange: info => {
      let fileList = info.fileList;
      // Only to show one recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);
      props.form.setFieldsValue({ [props.fileName]: info.file });
      setSelectedFileList({ [props.fileName]: fileList });
    },
    onRemove: () => {
      setSelectedFileList({ selectedFileList });
      delete selectedFileList[props.fileName];
      return selectedFileList;
      // this.setState(({ selectedFileList }) => {
      //   delete selectedFileList[this.props.fileName];
      //   return selectedFileList;
      // });
    },
    beforeUpload: file => {
      setSelectedFileList({ [props.fileName]: file });
      return false;
    },
    selectedFileList: selectedFileList[props.fileName],
  };

  return (
    <Upload
      {...fileProps}
      name={fileName}
      fileList={selectedFileList[props.fileName]}
      accept={acceptType}
      listType={fileType}
    >
      <Button>
        <Icon type="upload" /> {placeholder}
      </Button>
    </Upload>
  );
};

export default FileUpload;
