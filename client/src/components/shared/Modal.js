import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

export const Modal = ({
  open,
  onClose,
  onClickAgree,
  onClickDisagree,
  onClickSubmit,
  labelPrimary,
  labelSecondary,
  title,
  dialogContent,
  fullScreen,
  fullWidth,
  maxWidth,
  scroll,
  dividers,
  dialog
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    title={title}
    fullScreen={fullScreen}
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    scroll={scroll}
  >
    <DialogTitle>
      {title}
      <div className='icon'>
        <CloseIcon onClick={onClose} />
      </div>
    </DialogTitle>
    <DialogContent dividers={dividers}>{dialogContent}</DialogContent>
    <DialogActions>
      {dialog ? (
        <>
          <button onClick={onClickAgree} className='dashboard-button'>
            {labelPrimary}
          </button>
          <button onClick={onClickDisagree} className='dashboard-button'>
            {labelSecondary}
          </button>
        </>
      ) : (
        <button onClick={onClickSubmit} className='dashboard-button'>
          {labelPrimary}
        </button>
      )}
    </DialogActions>
  </Dialog>
);
