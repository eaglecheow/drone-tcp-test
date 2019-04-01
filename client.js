const net = require("net");

let x = 4;
let y = 4;
let z = 4;

const client = net.createConnection(
    {
        host: "127.0.0.1",
        port: 8080
    },
    () => {
        console.log("Connected to server");
        client.write("droneserver");

        setTimeout(() => {
            console.log("Sending Keyframe...");
            client.write("K:3,3,3");

            setInterval(() => {
                console.log("Sending more keyframe...");
                client.write(`K:${x++},${y++},${z++}`);
            }, 5000);

            setInterval(() => {
                console.log("Sending obstacle data...");
                client.write(
                    "0,0.968517,0,0.770111,0.385994,0.896283,0.919713,0.936407,0.932002,0.926296,1.11689,1.30847,1.16218,1.19196,1.26318,"
                );
            }, 3000);
        }, 10000);
    }
);

client.on("data", data => {
    console.log("data.toString(): ", data.toString());
    // client.end();
});

client.on("end", () => {
    console.log("Disconnected from server");
});
