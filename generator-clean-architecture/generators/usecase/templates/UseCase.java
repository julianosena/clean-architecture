package <%= rootPackage %>.usecase;

import <%= rootPackage %>.domain.<%= domainClassName %>;
import <%= rootPackage %>.domain.exception.UseCaseException;
import <%= rootPackage %>.gateway.exception.GatewayException;
import <%= rootPackage %>.gateway.<%= operationName %><%= domainClassName %>Gateway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class <%= operationName %><%= domainClassName %>UseCase {

    private static final Logger LOGGER = LoggerFactory.getLogger(<%= operationName %><%= domainClassName %>UseCase.class);

    private <%= operationName %><%= domainClassName %>Gateway <%= operationName.toLowerCase() %><%= domainClassName %>Gateway;

    @Autowired
    public class <%= operationName %><%= domainClassName %>UseCase(<%= operationName %><%= domainClassName %>Gateway <%= operationName.toLowerCase() %><%= domainClassName %>Gateway){
        this.<%= operationName.toLowerCase() %><%= domainClassName %>Gateway = <%= operationName.toLowerCase() %><%= domainClassName %>Gateway;
    }

    public <%= domainClassName %> execute(final <%= domainClassName %> <%= domainClassName.toLowerCase() %>) throws UseCaseException {
        try {
            return this.<%= operationName.toLowerCase() %><%= domainClassName %>Gateway.execute(<%= domainClassName.toLowerCase() %>);
        } catch (GatewayException e){
            throw new UseCaseException("", e);
        }
    }

}