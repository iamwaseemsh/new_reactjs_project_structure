import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import Previews from '../../../components/dropzone';
import httpClient, { requestType } from '../../../services/http_client';
import toastService from '../../../services/toast_service';
import { primeIcons } from '../../../constants/prime_icons';
import { Dialog } from 'primereact/dialog';
import PreviewLocalPostDialog from '../dialogs/preview_local_post_dialog';
import { useSelector } from 'react-redux';

export default function AddPostsScreen() {
  const authState = useSelector((state) => state.auth);


  const [moodes, setMoodes] = useState([]);
  const [previewFile, setPreviewFile] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  }
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }
  const dialogFuncMap = {
    'showDialog': setShowDialog,

  }



  const getModes = async () => {
    try {
      let response = await httpClient({
        "method": requestType.get,
        "url": "mood"
      });
      setMoodes(response.data);
    } catch (e) {
      toastService.error(e.toString());
    }

  }
  useEffect(() => {
    getModes();
  }, [])




  const [files, setFiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);



  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
    textAlign: 'center'

  };
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };


  const handleUploadClick = async () => {

    setUploadLoading(true);

    for (var i = 0; i < posts.length; i++) {
      let post = posts[i];
      await uploadFile({
        ...post,
        "file": await readFileAsArrayBuffer(post.file),

      },
        {
          isRetry: false
        });
      setPosts((prev) => {
        prev[i].is_uploaded = true;
        return [...prev];
      })
    }

    console.log(posts);
    setUploadLoading(false);

  }

  const uploadFile = async (post, { isRetry }) => {
    delete post["is_uploaded"]
    delete post["progress"]
    delete post["id"]
    try {
      await httpClient({
        method: requestType.post,
        url: "post",
        body: post
      })

    } catch (e) {
      toastService.error(e.toString());
      toastService.error("Trying again");
      if (isRetry != true) {
        uploadFile(post, { isRetry: true });
      }


    }

  }
  const classifyFile = (mimeType) => {
    if (mimeType.startsWith('image/')) {
      return 'photo';
    } else if (mimeType.startsWith('video/')) {
      return 'video';
    } else {
      return 'unknown';
    }
  };

  async function readFileAsArrayBuffer(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });



    return result_base64;
  }




  useEffect(() => {
    var count = 1;
    let userId = authState.user._id;
    setPosts(files.map((item) => {

      let type = classifyFile(item.type);
      return {
        "file": item,
        "is_uploaded": false,
        "progress": 0,
        "id": count++,
        "title": "",
        "createdBy": userId,
        "owner": "admin",
        "tags": [],
        "moods": [],
        "type": type,
        "file": item

      }
    }))
  }, [files])




  const returnTitleBody = (rowData, props) => {
    return <div>
      <InputText onChange={(e) => {
        setPosts((prev) => {
          prev[props.rowIndex].title = e.target.value;
          return [...prev];
        })
      }} value={rowData.title} />
    </div>
  }
  const returnTagseBody = (rowData, props) => {
    return <div>
      <InputText onChange={(e) => {
        setPosts((prev) => {
          prev[props.rowIndex].tags = e.target.value.split(",");
          return [...prev];
        })
      }} value={rowData.tags.join(",")} />
    </div>
  }
  const returnActionsBody = (rowData, props) => {
    return (
      <React.Fragment>
        <Button icon={primeIcons['pi-eye']} className="p-button-rounded p-button-success mr-2" onClick={() => {
          onClick("showDialog")
          setPreviewFile(rowData)
        }} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning  mr-2" onClick={() => {


        }} />


      </React.Fragment>
    );
  }

  const returnCategoryBody = (rowData, props) => {
    return <div>


      <MultiSelect placeholder="Moods" options={moodes ?? []} optionLabel="mood" optionValue="_id" value={rowData.moods} onChange={(e) => {
        setPosts((prev) => {
          prev[props.rowIndex].moods = e.target.value;
          return [...prev];
        })
      }} />

    </div>
  }

  const returnUploadStatusBody = (rowData) => {
    return <div>
      {rowData.is_uploaded ? "Uploaded" : "Not uploaded"}
    </div>
  }


  return (
    <div>
      <Dialog header={"Preview"} visible={showDialog} onHide={() => onHide('showDialog')} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '70vw' }}>

        {<PreviewLocalPostDialog body={previewFile} />}
      </Dialog>
      <div className='card flex justify-content-between'>
        <Previews files={files} setFiles={setFiles} />
        <Button label='Upload' loading={uploadLoading} onClick={handleUploadClick} />
      </div>
      <div className='card'>
        <DataTable value={posts} >
          <Column field='id' header="#" />
          {/* <Column header="Preview" body={previewBody} /> */}
          <Column field='title' body={returnTitleBody} header="Title" />
          <Column field='title' body={returnTagseBody} header="Tags [tag1,tag2]" />
          <Column field='category' body={returnCategoryBody} header="Category" />
          <Column field='is_uploaded' body={returnUploadStatusBody} header="Upload status" />
          <Column field='action' body={returnActionsBody} header="Action" />

        </DataTable>
      </div>
    </div>
  )
}
