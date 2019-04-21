import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import KanbanBoard from './kanbanBoard'
const styles = {
    parent: {
        display: 'flex',
        flexDirecton: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    sideBar: {
        backgroundColor: '#f5f5f5'
    }
}
class LandingPage extends React.Component {

    render() {
        const {classes} = this.props
        return (
            <React.Fragment>
                <Grid container spacing={0} className={classes.parent}>
                    
                    <Grid item xs={12}>
                        <KanbanBoard />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}


export default (withStyles(styles)(LandingPage))