package <%= gatewayPackage %>;

import <%= domainPackage %>.<%= domainClassName %>;
import <%= gatewayPackage %>.exception.<%= operationName %>GatewayException;

public interface <%= operationName %><%= domainClassName %>Gateway {

    public <%= domainClassName %> execute(<%= domainClassName %> domain) throws <%= operationName %>GatewayException;

}