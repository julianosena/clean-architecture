package <%= pack %>.gateway;

import <%= pack %>.domain.<%= domainClassName %>;
import <%= pack %>.exception.<%= operationName %>GatewayException;

public interface <%= operationName %><%= domainClassName %>Gateway {

    public <%= domainClassName %> execute(<%= domainClassName %> domain) throws <%= operationName %>GatewayException;

}