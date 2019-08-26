package <%= gatewayPackage %>.exception;

public class <%= operationName %>GatewayException extends Exception {

    public <%= operationName %>GatewayException(String message) {
        super(message);
    }

    public <%= operationName %>GatewayException(String message, Throwable e){
        super(message, e);
    }
}