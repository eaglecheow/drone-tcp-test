const net = require("net");

const PORT = 8081;
const HOST = "127.0.0.1";

let x = 10;
let y = 20;
let z = 30;

const server = net.createServer();
server.listen(PORT, HOST, () => {
    console.log(`TCP Server running at ${HOST}:${PORT}`);
});

server.on("connection", async sock => {
    console.log(`Connection created with Service Layer Client`);

    sock.on("data", data => {
        let dataString = data.toString();
        console.log("dataString: ", dataString);

        if (dataString === "LOC://") {
            console.log("Sending real location to Service Layer");
            sock.write(
                `KEYFRAME://${x}@${y}@${z},${(x += 2)}@${(y += 2)}@${(z += 2)},140`
            );
        } else if (dataString === "INIT://SERV@KEYFRAME") {
            console.log("Sending start point and end point");
            sock.write(
                "WP://2.942367@101.87295411,1.785645@103.3817178,1.7865364@103.3812404,1.7859238@103.3807468,1.7859948@103.3801728,1.7852978@103.3796176,1.7842549@103.3800361,1.7847509@103.3804759,1.7853273@103.3813235"
            );
            console.log("Start to send current location...");
            setInterval(() => {
                console.log("Sending current location...");
                sock.write("LOC://2.9423671@101.8729541@0.97@145");
            }, 500);

            console.log("Requesting for new path...");
            sock.write("PATHEND://");
            setInterval(() => {
                console.log("Requesting for new path...");
                sock.write("PATHEND://");
            }, 20000);
        }
    });

    sock.on("close", () => {
        console.log("Socket closed");
    });
});
