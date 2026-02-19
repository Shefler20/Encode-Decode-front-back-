import {Box, Button, TextField} from "@mui/material";
import { useState} from "react";
import {toast} from "react-toastify";
import axiosAPI from "../../axiosAPI.ts";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const FormEncodeDecode = () => {
    const [encodeText, setEncodeText] = useState<string>("");
    const [decodeText, setDecodeText] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const encodeClick = async () => {

        if (!encodeText.trim() || !password.trim()) return toast.error("Enter Password and Message");

        try {
            setLoading(true);
            const encodeObject = {
                message: encodeText,
                password: password,
            }
            const res = await axiosAPI.post(`/encode`, encodeObject);
            const data = res.data;
            setEncodeText("");
            setDecodeText(data.encoded);
            toast.success("Success encoded");
        } catch {
            toast.error("Error");
            setLoading(false);
        }finally {
            setLoading(false);
        }
    };

    const decodeClick = async () => {
        if (!decodeText.trim() || !password.trim()) return toast.error("Enter Password and Message");

        const encodeObject = {
            message: decodeText,
            password: password,
        }

        try {
            setLoading(true);
            const res = await axiosAPI.post(`/decode`, encodeObject);
            const data = res.data;
            setDecodeText("");
            setEncodeText(data.decoded);
            toast.success("Success decoded");
        } catch {
            toast.error("Error");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box sx={{ maxWidth: 600, margin: "50px auto" }}>
                    <TextField
                        label="Incode"
                        value={encodeText}
                        onChange={(e) => setEncodeText(e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        sx={{ mb: 2 }}
                        disabled={loading}
                    />

                    <Box sx={{ display: "flex", gap: 2 ,alignItems: "center", mb: 2}}>
                        <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            fullWidth
                            disabled={loading}
                        />

                        <Button
                            type="button"
                            variant="contained"
                            onClick={encodeClick}
                            sx={{ minWidth: 48 }}
                            disabled={loading}
                        >
                            <ArrowDownwardIcon/>
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={decodeClick}
                            sx={{ minWidth: 48 }}
                            disabled={loading}
                        >
                            <ArrowUpwardIcon/>
                        </Button>
                    </Box>
                <TextField
                    label="Decode"
                    value={decodeText}
                    onChange={(e) => setDecodeText(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ mb: 2 }}
                    disabled={loading}
                />
            </Box>
        </>
    );
};

export default FormEncodeDecode;