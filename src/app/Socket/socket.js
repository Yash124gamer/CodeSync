"use client";

import { io } from "socket.io-client";

export const socket = io( {path : "http://codesync-yash.netlify.app/"});