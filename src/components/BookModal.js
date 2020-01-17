import React from 'react';
import Modal from '@material-ui/core/Modal';

const BookModal = () => {
   const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


   return (
      <div>
         <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
         >
            <div>
               <h2 id="simple-modal-title">Text in a modal</h2>
               <p id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
               </p>
            </div>
         </Modal>
      </div>
   );
};

export default BookModal;
