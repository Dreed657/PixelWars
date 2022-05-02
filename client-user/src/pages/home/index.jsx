import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Card, CardContent, CardActions, Typography, Box } from '@mui/material';

const BASE_REST_URL = process.env.REACT_APP_BASE_REST_URL ?? 'http://localhost:5555/v1'

const HomePage = () => {
    const [canvases, setCanvases] = useState([]);

    useEffect(() => {
        fetch(`${BASE_REST_URL}/canvas`)
            .then(res => res.json())
            .then(data => setCanvases(data.data))
    }, []);

    return (
        <Box>
            {canvases.length > 0 ? (
                canvases.map((c, i) => {
                    return (
                        <Card sx={{ maxWidth: 345, marginTop: 2, marginBottom: 2, marginLeft: 'auto', marginRight: 'auto' }} key={i}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Id: {c.id}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Size: {c.size}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link underline="none" to={`/game/${c.id}`}>Enter</Link>
                            </CardActions>
                        </Card>
                    )
                })
            ) : (
                <h5>Loading...</h5>
            )}
        </Box>
    );
}

export default HomePage;