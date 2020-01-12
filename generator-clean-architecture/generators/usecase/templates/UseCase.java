package <%= rootPackage %>.usecase;

import <%= domainPackage %>.<%= domainClassName %>;
import <%= rootPackage %>.exception.GatewayException;
import <%= rootPackage %>.gateway.<%= operationName %><%= domainClassName %>Gateway;

public class <%= operationName %><%= domainClassName %>UseCase {

    private <%= domainClassName %>Gateway <%= operationName %><%= domainClassName %>Gateway;

    @Autowired
    public class <%= operationName %><%= domainClassName %>UseCase(<%= domainClassName %>Gateway <%= domainClassName %>Gateway){
        this.<%= domainClassName %>Gateway = <%= domainClassName %>Gateway;
    }

    public <%= domainClassName %> execute(<%= domainClassName %> <%= domainClassName.toLowerCase() %>) throws UseCaseException {
        try {
            this.<%= domainClassName %>gateway.execute(<%= domainClassName.toLowerCase() %>);
        } catch (GatewayException e){
            throw new <%= operationName %>UseCaseException("", e);
        }
    }

}