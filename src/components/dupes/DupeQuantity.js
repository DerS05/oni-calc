import React from 'react';

// redux
import { connect } from 'react-redux';
import { setDupesTotalQuantity } from '../../actions/dupeActions';

// material
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import MoreVert from '@material-ui/icons/MoreVert';

// components
import DupeDetails from './DupeDetails';

const styles = theme => ({
  root: {},
  card: {
    margin: theme.spacing.unit,
  },
  cardContent: {
    flex: '1 0 auto',
    display: 'flex',
    paddingRight: theme.spacing.unit * 2,
  },
  cardContentTitle: {
    flexGrow: 1,
  },
  quantity: {
    flexGrow: 1,
    marginRight: theme.spacing.unit,
    textAlign: 'right',
  },
});

export class DupeQuantity extends React.Component {
  state = {
    quantity: this.props.dupes.quantity,
    dialogOpen: false,
  };

  // open dialog
  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  // change quantities
  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 });
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.setDupesTotalQuantity(this.state.quantity);
    }, 500);
  };

  decrement = () => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.props.setDupesTotalQuantity(this.state.quantity);
      }, 500);
    }
  };

  render() {
    const { classes, fullScreen, dupes } = this.props;
    const { quantity, dialogOpen } = this.state;

    return (
      <Grid container className={classes.root}>
        {/* <Grid item xs={12}>
          <Typography>Total</Typography>
        </Grid> */}
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <Dialog
            fullScreen={fullScreen}
            open={dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DupeDetails details={dupes} />
            <DialogActions>
              <Button
                target="_blank"
                href="https://oxygennotincluded.gamepedia.com/duplicant"
                color="primary"
              >
                WIKI
              </Button>
              <Button
                variant="contained"
                onClick={this.handleClose}
                color="primary"
                autoFocus
              >
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="title" className={classes.cardContentTitle}>
                Total Dupes
              </Typography>
              <IconButton onClick={this.handleClickOpen}>
                <MoreVert />
              </IconButton>
            </CardContent>
            <CardActions>
              {/* <Tooltip title="Decrease"> */}
              <IconButton
                color="secondary"
                className={classes.button}
                aria-label="Decrement"
                onClick={this.decrement}
              >
                <ArrowDropDown />
              </IconButton>
              {/* </Tooltip> */}
              <Typography variant="title" className={classes.quantity}>
                {quantity}
              </Typography>
              {/* <Tooltip title="Increase"> */}
              <IconButton
                color="primary"
                className={classes.button}
                aria-label="Increment"
                onClick={this.increment}
              >
                <ArrowDropUp />
              </IconButton>
              {/* </Tooltip> */}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    dupes: state.calculator.dupes,
  };
};

const mapDispatchToProps = {
  setDupesTotalQuantity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DupeQuantity));
