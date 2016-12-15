% This single file contains all the code. The variables are as follows:
% m = filter order
% phi = learning rate
% ns = number of samples
% X is the input matrix (built from primary.mat)
% Y is the desired output vector(built from reference.mat)
% Yhat is the calculated output (which is the matrix of voice samples = error)
% mse is the mean squared error calculated from Yhat

clc
clear all
close all

m = 2; 
phi = 0.3; 
ns = 70000;
load ('primary1.mat');

X = zeros(m, ns-m+1);
X = primary(1:m);

for i = 1:ns-m+1
    for j = 1:m
        X(i,j) = primary(j+i-1);
    end
end

load('reference1.mat');

Y = zeros(1, ns-m+1);
Y = reference(m+1:ns);
Y = transpose(Y);
Y = [Y;zeros(1)];

%building initial weight vector, including wo = 0 as the bias
Wt = zeros(m, 1);

Yhat = zeros(ns-m+1, 1);
mse = zeros(ns-m+1, 1);

wt_track = zeros(m, ns-m+1);
w1 = zeros(ns-m+1, 1);
w2 = zeros(ns-m+1, 1);

for r = 1:ns-m+1
    Worg = Wt;
    %E = 0;
    for p = 1:m
        Wt(p,1) = Worg(p,1) - (phi*(((X(r,:)*Wt(:,1)) - Y(r))).*X(r,p))/((X(r,:)*transpose(X(r,:))));
        wt_track(p,r) = Wt(p,1);
    end
    Yhat(r) = (X(r,:)*Wt(:,1) - Y(r)); 
    mse(r) = mean(Yhat(m+1:r).^2);
end

wt_track = transpose(wt_track);

w1 = wt_track(:,1);
w1 = transpose(w1);
w2 = wt_track(:,2);
w2 = transpose(w2);

mse_total = mean(Yhat.^2);
display(mse_total);
 
mean_ref = mean(Y.^2);
display(mean_ref);

%calculate SNR
snr = 10 * log10((mean_ref/mse_total));
display(snr);

%Plot of error against number of iterations
figure(1);
i = linspace(1, ns-m+1, ns-m+1);
plot(i, Yhat(i));

%plot of MSE against time
figure(2);
time = 1:ns-m+1;
plot(time, mse);
xlabel = 'time';
ylabel = 'MSE';

%weighttrack plot
figure(3);
time = 1:70000-m+1;
plot(time, w1, time, w2);
ylim([-15 20]);

% %contour plot which is useful only for filter order m = 2
% j_theta = zeros(100, 100);
% % w1_vals = linspace(-25, 22, 100);
% % w2_vals = linspace(-11, 99, 100);
% w1_vals = linspace(-300, 300, 100);
% w2_vals = linspace(-300, 300, 100);
% 
% for q = 1:length(w1_vals)
%     for w = 1:length(w2_vals)
%         w_vals = [w1_vals(q) w2_vals(w)]';
%         h_theta = (X * w_vals);
%         j_theta(q, w) = 1/(2* (70000-m+1))*sum((h_theta - Y).^2);
%     end
% end
% 
% figure;
% contour(w1_vals, w2_vals, 10*log10(j_theta.'))
% % xlabel('weights_1'); 
% % ylabel('weights_2');
% % title('Cost function MSE');
% hold on;
% plot(wt_track(:,1), wt_track(:,2));

%the error signal = voice sugnal
sound(Yhat, 21000);



        


