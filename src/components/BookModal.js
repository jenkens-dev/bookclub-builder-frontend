import React from 'react';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_MODAL_STATUS as toggleModalStatus } from '../actions/modal';
import { makeStyles } from '@material-ui/core/styles';

const BookModal = () => {
   function getModalStyle() {
      return {
         top: `50%`,
         left: `50%`,
         transform: `translate(-50%, -50%)`,
      };
   }

   const useStyles = makeStyles(theme => ({
      paper: {
         position: 'absolute',
         top: '10%',
         left: '10%',
         overflow: 'scroll',
         height: '100%',
         display: 'block',
         position: 'absolute',
         width: 400,
         backgroundColor: theme.palette.background.paper,
         border: '2px solid #000',
         boxShadow: theme.shadows[5],
         padding: theme.spacing(2, 4, 3),
      },
   }));

   const classes = useStyles();
   const [modalStyle] = React.useState(getModalStyle);
   const dispatch = useDispatch();
   const book = useSelector(state => state.book.book);
   console.log(book);
   const open = useSelector(state => state.modal.open);

   const handleClose = () => {
      dispatch(toggleModalStatus(false));
   };

   return (
      <div>
         <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            onClose={handleClose}
            open={open}
         >
            <div style={modalStyle} className={classes.paper}>
               <h2 id="simple-modal-title">
                  {book ? book.volumeInfo.title : null}
               </h2>
               <p id="simple-modal-description">
                  {book ? book.volumeInfo.description : null}
               </p>
            </div>
         </Modal>
      </div>
   );
};

export default BookModal;
