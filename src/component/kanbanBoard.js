import React from 'react'
import { Draggable, Droppable } from 'react-drag-and-drop'
import { connect } from 'react-redux'
import { getAllKanban, updateKanban, createKanban } from '../action/kanban.action'
import { ApiConstant } from '../constant'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { Link} from 'react-router-dom'

const apiConst = new ApiConstant()

const styles = {
    paper: {
        padding: 10,
        textAlign: 'center',
        height: '100%',
        height: '100%',
        boxSizing: 'border-box'
      },
    dropPlace: {
          height: '100%'
      },
    gridContainer: {
          height: '100%',
          width: '100%'
      },
    addKanbanBtn: {
          position: 'absolute',
          right: 10,
          bottom: 10
      },
    field: {
          width: '100%'
      },
    parent:{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0px 10px'
    },
    heading: {
        boxSizing: 'border-box',
        padding: '10px 0px',
        textTransform: 'uppercase',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: '7px 0',
        margin: '10px 0',
        boxShadow: '1px 1px 3px 0px #E91E63, 2px 5px 7px 4px rgba(0,0,0,0.14), 0px 0px 9px -3px rgba(0,0,0,0.12)',
        cursor: 'pointer'
    },
    cardContent: {
        padding: 16
    },
    loginMsg: {
        height: '100%',
        width: '100%',
        backgroundColor: '#211717b3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
}

class KanbanBoard extends React.Component {
    constructor() {
        super()
        this.state = {
            kanbanArray: [],
            openDialog: false,
            loggedUserData: {},
            newKanban: {
                task_name: '',
                task_stage: '',
                reporter: '',
                priority: ''
            },
            showKanban:  false,
            loggedInMsg: true,
        }
    }

    componentWillMount() {
        this.props.getAllKanban( apiConst.BASE_URL + apiConst.KANBAN)
        if(this.state.loggedUserData.full_name === '') {
            alert("please login")
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.kanbanReducer.status && nextProps.userReducer.status) {
            this.setState((state) => {
                return {
                    ...state,
                    kanbanArray: nextProps.kanbanReducer.value,
                    loggedInMsg: false,
                    openDialog: false
                }
            })
        }
        if(nextProps.userReducer.status && nextProps.userReducer.value !== 'null') {
            this.setState(() => {
                return {
                    loggedUserData: nextProps.userReducer.value
                }
            })
        }
    }

    _onDrop(e, stage) {
        const item = JSON.parse(e.kanban)
        const kanbanObject = {
            url: apiConst.BASE_URL + apiConst.UPDATE_KANBAN,
            body: {
                id: item._id,
                task_stage: stage
            }
        }
        this.props.updateKanban(kanbanObject)
    }
    __handleDialogOpen = () => {
        this.setState({
            ...this.state,
                openDialog: true
        })
    }

    _handleClose = () => {
        this.setState({ openDialog: false });
      };

    _handleChange = (event, attr) => {
        event.preventDefault()
        const obj = Object.assign({}, this.state.newKanban)
        obj[attr] = event.target.value
        if(obj[attr]) {
            this.setState(() => {
                return {
                    newKanban: obj
                }
            })
        }
    }
    _addNewKanbanBtn = () => {
            this.setState((state) => {
                // console.log(state)
                return {
                    newKanban: {
                        ...state.newKanban,
                        reporter: this.state.loggedUserData.full_name
                    }
                }
            }, () => {
                // console.log(this.state)
                const kanbanObj = {
                    url: apiConst.BASE_URL + apiConst.KANBAN,
                    body: this.state.newKanban
                }
                this.props.createKanban(kanbanObj)
                this.props.getAllKanban( apiConst.BASE_URL + apiConst.KANBAN)
            })
    }



    render() {
    // console.log(this.props)
    const { classes } = this.props
    const { kanbanArray, openDialog, newKanban, loggedUserData, showKanban, loggedInMsg } = this.state
        // console.log(kanbanArray)
        return (
            <React.Fragment>
                <div className={classes.parent}>
                {
                    loggedInMsg && 
                    <div className={classes.loginMsg}> 
                    <Typography variant="h5" style={{color: 'white', padding: 10}}>
                           OOPS!!! you are not logged In. Please Login to see kanban         
                    </Typography>
                    <Button variant="contained" color="primary" to="/" component={Link}>
                        Login
                    </Button>
                    </div>
                }
                {
                     
                    <div className={classes.heading}> 
                        <Typography variant="h5" color="textPrimary" gutterBottom>
                               Hello {loggedUserData.full_name}, welcome to Kanban Board          
                        </Typography>
                        <Typography variant="subheading" color="textPrimary" gutterBottom>
                               drag and drop the task from list to chnage the stage          
                        </Typography>
                    </div>
                }
                    
                    <Grid container spacing={8} className={classes.gridContainer}>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                                <Typography variant="headline" color="textPrimary" gutterBottom>
                                    ToDo              
                                </Typography>
                                <Droppable
                                    className={classes.dropPlace}
                                    types={['kanban']} // <= allowed drop types
                                    onDrop={(e) => this._onDrop(e, 'todo')}>
                                    {
                                        kanbanArray.filter((obj) => {
                                            return obj.task_stage.toLowerCase() === 'todo';
                                        }).map((element, i) => (
                                            <Draggable key={i}  data={JSON.stringify(element)} type="kanban">
                                                <Card className={classes.card}>
                                                    <CardContent className={classes.cardContent}>
                                                        <Typography variant="subtitle1" color="primary" gutterBottom>
                                                            {element.task_name}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Draggable>
                                        ))
                                    }
                                </Droppable>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                            <Typography variant="headline" color="textPrimary" gutterBottom>
                                    In Progress              
                                </Typography>
                            <Droppable
                                    className={classes.dropPlace}
                                    types={['kanban']} // <= allowed drop types
                                    onDrop={(e) => this._onDrop(e, 'in progress')}>
                                    {
                                        kanbanArray.filter((obj) => {
                                            return obj.task_stage.toLowerCase() === 'in progress';
                                        }).map((element, i) => (
                                            <Draggable key={i}  data={JSON.stringify(element)} type="kanban">
                                                <Card className={classes.card}>
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="primary" gutterBottom>
                                                            {element.task_name}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Draggable>
                                        ))
                                    }
                                </Droppable>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>
                            <Typography variant="headline" color="textPrimary" gutterBottom>
                                    ToDo              
                                </Typography>
                            <Droppable
                                    className={classes.dropPlace}
                                    types={['kanban']} // <= allowed drop types
                                    onDrop={(e) => this._onDrop(e, 'done')}>
                                    {
                                        kanbanArray.filter((obj) => {
                                            return obj.task_stage.toLowerCase() === 'done';
                                        }).map((element, i) => (
                                            <Draggable key={i}  data={JSON.stringify(element)} type="kanban">
                                                <Card className={classes.card}>
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="primary" gutterBottom>
                                                            {element.task_name}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Draggable>
                                        ))
                                    }
                                </Droppable>
                            </Paper>
                        </Grid>
                        <div className={classes.addKanbanBtn}>
                            <Fab color="secondary" aria-label="Add" className={classes.fab} disabled={loggedInMsg} onClick={this.__handleDialogOpen}>
                                <AddIcon />
                            </Fab>
                        </div>
                        {openDialog && 
                                  <div>
                                  <Dialog
                                    open={openDialog}
                                    onClose={this._handleClose}
                                    aria-labelledby="form-dialog-title"
                                  >
                                    <DialogTitle id="form-dialog-title">Add New Task To Kanban</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText>
                                        To add new task to this website, please enter the detils here. 
                                      </DialogContentText>
                                      <TextField
                                        className={classes.field}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        name="task_name"
                                        label="Task name"
                                        type="text"
                                        onChange={(e) => { this._handleChange(e, 'task_name')}}
                                        fullWidth
                                      />
                                    <TextField
                                        className={classes.field}
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        value={loggedUserData.full_name}
                                        label="Reporter"
                                        type="text"
                                        onChange={(e) => { this._handleChange(e, 'reporter')}}
                                        fullWidth
                                      />
                                      <FormControl className={classes.field}>
                                        <InputLabel htmlFor="stage">Task Stage</InputLabel>
                                        <Select
                                            value={newKanban.task_stage}
                                            className={classes.field}
                                            onChange={(e) => { this._handleChange(e, 'task_stage')}}
                                            inputProps={{
                                            name: 'task_stage',
                                            id: 'stage',
                                            }}
                                        >
                                            <MenuItem value="ToDo">ToDo</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Done">Done</MenuItem>
                                        </Select>
                                      </FormControl>
                                    <FormControl className={classes.field}>
                                        <InputLabel htmlFor="priority">Priority</InputLabel>
                                        <Select
                                            value={newKanban.priority}
                                            className={classes.field}
                                            onChange={(e) => { this._handleChange(e, 'priority')}}
                                            inputProps={{
                                            name: 'priority',
                                            id: 'priority',
                                            }}
                                        >
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Medium">Medium</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={this._handleClose} color="primary">
                                        Cancel
                                      </Button>
                                      <Button onClick={this._addNewKanbanBtn} color="primary">
                                        Save
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                        }
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        kanbanReducer: state.kanbanReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllKanban: (kanbanUrl) => dispatch(getAllKanban(kanbanUrl)),
        updateKanban: (kanbanObject) => dispatch(updateKanban(kanbanObject)),
        createKanban: (kanbanObj) => dispatch(createKanban(kanbanObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(KanbanBoard))
