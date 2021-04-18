import { useState } from "react";
import { Divider, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import SideBarItem from "./SideBarItem";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  newChatBtn: {
    borderRadius: "0px"
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px"
  },
  newNoteBtn: {
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#29487d",
    color: "white",
    "&:hover": {
      backgroundColor: "#88a2ce"
    }
  },
  sidebarContainer: {
    marginTop: "0px",
    width: "300px",
    height: "100%",
    boxSizing: "border-box",
    float: "left",
    overflowY: "scroll",
    overflowX: "hidden"
  },
  newNoteInput: {
    width: "100%",
    margin: "0px",
    height: "35px",
    outline: "none",
    border: "none",
    paddingLeft: "5px",
    "&:focus": {
      outline: "2px solid rgba(81, 203, 238, 1)"
    }
  },
  newNoteSubmitButton: {
    width: "100%",
    backgroundColor: "#28787c",
    borderRadius: "0px",
    color: "white",
    "&:hover": {
      backgroundColor: "#15a3aa"
    }
  }
}));

const SideBar = ({
  notes,
  selectedNoteIndex,
  selectNote,
  deleteNote,
  addNote
}) => {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState("");

  const classes = useStyles();

  const newNote = () => {
    setAddingNote(!addingNote);
    setTitle("");
  };

  const updateTitle = (title) => {
    setTitle(title);
  };

  const addNewNote = () => {
    addNote(title);
    setTitle("");
    setAddingNote(false);
  };

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button className={classes.newNoteBtn} onClick={newNote}>
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            />
            <Button
              className={classes.newNoteSubmitButton}
              onClick={addNewNote}
            >
              Add Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((note, index) => {
            return (
              <div key={index}>
                <SideBarItem
                  note={note}
                  index={index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteNote}
                />
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SideBar;
