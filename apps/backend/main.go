package main

func main() {

	server := MakeServer()

	MakeApiGroup(server)

	server.Logger.Fatal(server.Start(":3000"))
}
