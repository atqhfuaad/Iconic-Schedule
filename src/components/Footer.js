import React from 'react'
import { Typography, Link } from "@material-ui/core"

export function Footer() {
    return (
        <>
        <div style={{padding: "10px 0px"}}>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/~rbnm/">
                Iconic Four Inc.
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        
        </div>
        </>
    );

}