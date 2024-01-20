protoc --ts_opt=esModuleInterop=true --ts_out="./client_web/src/types" --go_out="./server/src" shared/types.proto
PAUSE