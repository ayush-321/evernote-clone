import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  titleInput: {
    height: "50px",
    boxSizing: "border-box",
    border: "none",
    padding: "5px",
    fontSize: "24px",
    width: "calc(100% - 300px)",
    backgroundColor: "#29487d",
    color: "white",
    paddingLeft: "50px"
  },
  editIcon: {
    position: "absolute",
    left: "310px",
    top: "12px",
    color: "white",
    width: "10",
    height: "10"
  },
  editorContainer: {
    height: "100%",
    boxSizing: "border-box"
  },
  editor: {
    height: "500px"
  },
  saveButton: {
    width: "100px",
    position: "absolute",
    left: "300px",
    top: "570px"
  }
}));

const Editor = ({ selectedNote, selectedNoteIndex, notes, updateNote }) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const classes = useStyles();

  const updateBody = async (val) => {
    await setText(val);
  };

  // const update = debounce(() => {
  //   console.log("Updating Database");
  //   updateNote(id, {
  //     title: title,
  //     text: text
  //   });
  // }, 1500);

  const update = () => {
    console.log("Updating Database");
    updateNote(id, {
      title: title,
      text: text
    });
  };

  const updateTitle = (text) => {
    setTitle(text);
    update();
  };

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  return (
    <Grid>
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder="Note title..."
          onChange={(e) => updateTitle(e.target.value)}
          value={title ? title : ""}
        />
        <ReactQuill
          value={text}
          onChange={updateBody}
          className={classes.editor}
        ></ReactQuill>
      </div>
      <Button
        onClick={update}
        variant="contained"
        color="primary"
        className={classes.saveButton}
      >
        Save
      </Button>
    </Grid>
  );
};

export default Editor;
