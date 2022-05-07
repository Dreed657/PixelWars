import { useEffect, useState } from 'react';

import {
    Card,
    Grid,
    Box,
    Container,
    Typography,
    Switch,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';

import {
    getTotals,
    getPlayPerClient,
    getPlayPerCanvas,
    getSnaphotsByHour,
    getPlaysByHour,
} from './service';

import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AdminPage = () => {
    const [totals, setTotals] = useState();
    const [playsPerClient, setPlaysPerClient] = useState();
    const [playsPerCanvas, setPlaysPerCanvas] = useState();
    const [snaphotsByHour, setSnaphotsByHour] = useState();
    const [playsByHour, setPlaysByHour] = useState();

    const [seconds, setSeconds] = useState(5);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                updateData();
            }, seconds * 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const handleSecondsChange = (event) => {
        setSeconds(event.target.value);
    };

    const handleToggleChange = (event) => {
        setIsActive(!isActive);
    };

    const updateData = () => {
        getTotals(setTotals);
        getPlayPerClient(setPlaysPerClient);
        getPlayPerCanvas(setPlaysPerCanvas);
        getSnaphotsByHour(setSnaphotsByHour);
        getPlaysByHour(setPlaysByHour);
    };

    return (
        <Box sx={{ mt: 7 }}>
            <Container>
                <Grid container spacing={4}>
                    {totals ? (
                        <Grid
                            container
                            spacing={2}
                            sx={{ mb: 2, textAlign: 'center' }}
                        >
                            <Grid item xs>
                                <Card>
                                    <Typography>Canvas</Typography>
                                    <Typography>
                                        {totals.totalCanvas}
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <Typography>Plays</Typography>
                                    <Typography>{totals.totalPlays}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <Typography>Snapshots</Typography>
                                    <Typography>{totals.totalSnaps}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs>
                                <Card>
                                    <Typography>Unique</Typography>
                                    <Typography>
                                        {totals.totalUniqueClients}
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs>
                            <Card>
                                {playsPerClient ? (
                                    <Bar data={playsPerClient} />
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                {playsPerCanvas ? (
                                    <Bar data={playsPerCanvas} />
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Card>
                                {snaphotsByHour ? (
                                    <Line data={snaphotsByHour} />
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                {playsByHour ? (
                                    <Line data={playsByHour} />
                                ) : (
                                    <Typography>Loading...</Typography>
                                )}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, float: 'right' }}>
                    <Grid container>
                        <Grid>
                            <Switch
                                checked={isActive}
                                onChange={handleToggleChange}
                            />
                        </Grid>
                        <Grid>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">
                                    Interval
                                </InputLabel>
                                <Select
                                    value={seconds}
                                    label="Interval"
                                    onChange={handleSecondsChange}
                                >
                                    <MenuItem value={5}>5 Seconds</MenuItem>
                                    <MenuItem value={15}>15 Seconds</MenuItem>
                                    <MenuItem value={60}>1 Minute</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminPage;
