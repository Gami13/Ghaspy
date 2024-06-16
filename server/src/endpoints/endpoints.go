package endpoints

import (
	"context"
	"ghaspy_server/src/queries"
)

type EndpointContext struct {
	Query *queries.Queries
	Ctx   context.Context
}

func NewEndpointContext(query *queries.Queries, ctx context.Context) *EndpointContext {
	if query == nil {
		panic("Query is nil!")
	}
	if ctx == nil {
		panic("Context is nil!")
	}

	return &EndpointContext{Query: query, Ctx: ctx}
}
