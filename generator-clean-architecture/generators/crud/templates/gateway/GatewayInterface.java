package <%= pack %>;

public interface <%= operationName %><%= domainClassName %>Gateway {

    public <%= domainClassName %> execute(<%= domainClassName %> domain) throws <%= operationName %>GatewayException;

}