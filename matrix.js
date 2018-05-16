function Matriz(n,v,c){
	var i,m;
	
	this.nd=n; //numero de dimensiones de la matriz.
	this.c=c; //si tiene componentes complejos
	this.vecDim=null;
	m=1;
	if (n>0) {//es matriz
		this.vecDim=new Array(n); //numero de elementos por cada dimension
		for (i=0;i<n;i++){
			vecDim[i]=v[i];
			m*=v[i];
		}
	}
	this.reales=new Array(m);
	this.complejos=(c)?(new Array(m)):(null);
}


Matriz.prototype.crear2d=function(str) { //"[1,2,3;4+5i,5,6;7,8,9]"
	var z;
	//ver si en el string hay %i, para saber si es complejo o no
	//separar en filas utilizando ;
	//separar en elementos utilizando ,
	//volverlo número y agregarlo a la matriz
	
	return z;
}

Matriz.prototype.crearEscalar=function(str){ //1+5*%i-8+3%i
}

Matriz.prototype.crearVector=function(str){ //1:4:56   o 1:9
}





Matriz.prototype.matMult=function(x,y) {
	var z,i1,i2,i3,l1,l2,l3,f,j1,j2,j3,j4,j5,xr,yr,zr;
	
	if ((x==null)||(y==null)) {
		return null;
	} else if ((x.nd==2)&&(y.nd==2)) { //deben ser matrices bidimensionales
		l1=x.vecDim[0];
		l2=x.vedDim[1];
		l3=y.vedDim[1];
		if ((l2==y.vecDim[0])&&(l1>0)&&(l2>0)&&(l3>0)) {//debe cumplir las condiciones de dimension de fila y columna, y ser no nulas
			z = new Matriz(2,new Array(l1,l3),x.c||y.c);
			if (x.c && y.c) { //ambos complejo
				xr=x.reales;
				yr=y.reales;
				zr=z.reales;
				xc=x.complejos;
				yc=y.complejos;
				zc=z.complejos;
				j1=0;//i1*l2
				j4=0;
				for (i1=0;i1<l1;i++) {
					j5=j4;
					for (i3=0;i3<l3;i3++) {
						fr=0;
						fc=0;
						j2=i3;
						j3=j1;
						for (i2=0;i2<l2;i2++){
							fr+=xr[j3]*yr[j2]-xc[j3]*yc[j2];
							fc+=xr[j3]*yc[j2]+xc[j3]*yr[j2];
							j2+=l3;
							j3++;
						}
						zr[j5]=fr;//[i1*l3+i3]
						zc[j5]=fc;
						j5++;
					}
					j1+=l2;
					j4+=l3;
				}
			} else if (x.c && (!y.c)) { //compleo x real
				xr=x.reales;
				yr=y.reales;
				zr=z.reales;
				xc=x.complejos;
				zc=z.complejos;
				j1=0;//i1*l2
				j4=0;
				for (i1=0;i1<l1;i++) {
					j5=j4;
					for (i3=0;i3<l3;i3++) {
						fr=0;
						fc=0;
						j2=i3;
						j3=j1;
						for (i2=0;i2<l2;i2++){
							fr+=xr[j3]*yr[j2];
							fc+=xc[j3]*yr[j2];
							j2+=l3;
							j3++;
						}
						zr[j5]=fr;//[i1*l3+i3]
						zc[j5]=fc;
						j5++;
					}
					j1+=l2;
					j4+=l3;
				}
			} else if ((!x.c) && y.c) { //real x complejo
				xr=x.reales;
				yr=y.reales;
				zr=z.reales;
				yc=y.complejos;
				zc=z.complejos;
				j1=0;//i1*l2
				j4=0;
				for (i1=0;i1<l1;i++) {
					j5=j4;
					for (i3=0;i3<l3;i3++) {
						fr=0;
						fc=0;
						j2=i3;
						j3=j1;
						for (i2=0;i2<l2;i2++){
							fr+=xr[j3]*yr[j2];
							fc+=xr[j3]*yc[j2];
							j2+=l3;
							j3++;
						}
						zr[j5]=fr;//[i1*l3+i3]
						zc[j5]=fc;
						j5++;
					}
					j1+=l2;
					j4+=l3;
				}
			} else { //ambos reales
				xr=x.reales;
				yr=y.reales;
				zr=z.reales;
				j1=0;//i1*l2
				j4=0;
				for (i1=0;i1<l1;i++) {
					j5=j4;
					for (i3=0;i3<l3;i3++) {
						f=0;
						j2=i3;
						j3=j1;
						for (i2=0;i2<l2;i2++){
							f+=xr[j3]*yr[j2];//[i1*l2+i2] * [i2*l3+i3]
							j2+=l3;
							j3++;
						}
						zr[j5]=f;//[i1*l3+i3]
						j5++;
					}
					j1+=l2;
					j4+=l3;
				}
			}
			return z;
		} else {
			return null;
		}
	} else {
		return null;
	}
}




Matriz.prototype.mult=function(x,y) {
	var i,z,m,xr,yr,zr,xc,yc,zc;
	
	if ((x==null)||(y==null)) {
		return null;
	} else if ((x.nd==y.nd)&&(x.nd>0)) {//dos matrices
		m=1;
		for (i=0;i<x.nd;i++) {//deben ser matrices de igual dimension
			if (x.vecDim[i]!=y.vecDim[i]) {
				return null;
			}
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr[i]-xc[i]*yc[i];
				zc[i]=xr[i]*yc[i]+xc[i]*yr[i];
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr[i];
				zc[i]=xc[i]*yr[i];
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr[i];
				zc[i]=xr[i]*yc[i];
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr[i];
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd>0)){ //escalar por matriz
		m=1;
		for (i=0;i<y.nd;i++) {
			m*=y.vecDim[i];
		}
		z = new Matriz(y.nd,y.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr*yr[i]-xc*yc[i];
				zc[i]=xr*yc[i]+xc*yr[i];
			}
		} if (x.c && (!y.c)) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr*yr[i];
				zc[i]=xc*yr[i];
			}
		} if ((!x.c) && y.c) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr*yr[i];
				zc[i]=xr*yc[i];
			}
		} else { //es real puro
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr*yr[i];
			}
		}
		return z;
	} else if ((x.nd>0)&&(y.nd==0)){ //matriz por escalar
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr-xc[i]*yc;
				zc[i]=xr[i]*yc+xc[i]*yr;
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr;
				zc[i]=xc[i]*yr;
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			yc=y.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr;
				zc[i]=xr[i]*yc;
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]*yr;
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd==0)){ //escalar por escalar
		z = new Matriz(0,null,x.c || y.c);
		if (x.c && y.c) { //ambos son complejos
			z.reales[0]=x.reales[0]*y.reales[0]-x.complejos[0]*y.complejos[0];
			z.complejos[0]=x.reales[0]*y.complejos[0]+x.complejos[0]*y.reales[0];
		} if (x.c && (!y.c)) {
			z.reales[0]=x.reales[0]*y.reales[0];
			z.complejos[0]=x.complejos[0]*y.reales[0];
		} if ((!x.c) && y.c) {
			z.reales[0]=x.reales[0]*y.reales[0];
			z.complejos[0]=x.complejos[0]*y.reales[0];
		} else { //es real puro
			z.reales[0]=x.reales[0]*y.reales[0];
		}
		return z;
	} else {
		return null;
	}
}



Matriz.prototype.suma=function(x,y) {
	var i,z,m,xr,yr,zr,xc,yc,zc;
	
	if ((x==null)||(y==null)) {
		return null;
	} else if ((x.nd==y.nd)&&(x.nd>0)) {
		m=1;
		for (i=0;i<x.nd;i++) {
			if (x.vecDim[i]!=y.vecDim[i]) {
				return null;
			}
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr[i];
				zc[i]=xc[i]+yc[i];
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr[i];
				zc[i]=xc[i];
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr[i];
				zc[i]=yc[i];
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr[i];
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd>0)){ //escalar por matriz
		m=1;
		for (i=0;i<y.nd;i++) {
			m*=y.vecDim[i];
		}
		z = new Matriz(y.nd,y.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr+yr[i];
				zc[i]=xc+yc[i];
			}
		} if (x.c && (!y.c)) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr+yr[i];
				zc[i]=xc;
			}
		} if ((!x.c) && y.c) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr+yr[i];
				zc[i]=yc[i];
			}
		} else { //es real puro
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr+yr[i];
			}
		}
		return z;
	} else if ((x.nd>0)&&(y.nd==0)){ //matriz por escalar
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr;
				zc[i]=xc[i]+yc;
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr;
				zc[i]=xc[i];
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			yc=y.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]+yr;
				zc[i]=yc;
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr;
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd==0)){ //escalar mas escalar
		z = new Matriz(0,null,x.c || y.c);
		if (x.c && y.c) { //ambos son complejos
			z.reales[0]=x.reales[0]+y.reales[0];
			z.complejos[0]=x.complejos[0]+y.complejos[0];
		} if (x.c && (!y.c)) {
			z.reales[0]=x.reales[0]+y.reales[0];
			z.complejos[0]=x.complejos[0];
		} if ((!x.c) && y.c) {
			z.reales[0]=x.reales[0]+y.reales[0];
			z.complejos[0]=y.complejos[0];
		} else { //es real puro
			z.reales[0]=x.reales[0]+y.reales[0];
		}
		return z;
	} else {
		return null;
	}
}



Matriz.prototype.resta=function(x,y) {
	var i,z,m,xr,yr,zr,xc,yc,zc;
	
	if ((x==null)||(y==null)) {
		return null;
	} else if ((x.nd==y.nd)&&(x.nd>0)) {
		m=1;
		for (i=0;i<x.nd;i++) {
			if (x.vecDim[i]!=y.vecDim[i]) {
				return null;
			}
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr[i];
				zc[i]=xc[i]-yc[i];
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr[i];
				zc[i]=xc[i];
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr[i];
				zc[i]=-yc[i];
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr[i];
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd>0)){ //escalar por matriz
		m=1;
		for (i=0;i<y.nd;i++) {
			m*=y.vecDim[i];
		}
		z = new Matriz(y.nd,y.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr-yr[i];
				zc[i]=xc-yc[i];
			}
		} if (x.c && (!y.c)) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr-yr[i];
				zc[i]=xc;
			}
		} if ((!x.c) && y.c) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr-yr[i];
				zc[i]=-yc[i];
			}
		} else { //es real puro
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr-yr[i];
			}
		}
		return z;
	} else if ((x.nd>0)&&(y.nd==0)){ //matriz por escalar
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr;
				zc[i]=xc[i]-yc;
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr;
				zc[i]=xc[i];
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			yc=y.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr;
				zc[i]=-yc;
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]-yr;
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd==0)){ //escalar mas escalar
		z = new Matriz(0,null,x.c || y.c);
		if (x.c && y.c) { //ambos son complejos
			z.reales[0]=x.reales[0]-y.reales[0];
			z.complejos[0]=x.complejos[0]-y.complejos[0];
		} if (x.c && (!y.c)) {
			z.reales[0]=x.reales[0]-y.reales[0];
			z.complejos[0]=x.complejos[0];
		} if ((!x.c) && y.c) {
			z.reales[0]=x.reales[0]-y.reales[0];
			z.complejos[0]=-y.complejos[0];
		} else { //es real puro
			z.reales[0]=x.reales[0]-y.reales[0];
		}
		return z;
	} else {
		return null;
	}
}



Matriz.prototype.division=function(x,y) {
	var i,z,m,xr,yr,zr,xc,yc,zc,d,xri,xci,yri,yci;
	
	if ((x==null)||(y==null)) {
		return null;
	} else if ((x.nd==y.nd)&&(x.nd>0)) { //ambas matrices
		m=1;
		for (i=0;i<x.nd;i++) {
			if (x.vecDim[i]!=y.vecDim[i]) {
				return null;
			}
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				xri=xr[i];
				yri=yr[i];
				xci=xc[i];
				yci=yc[i];
				d=yri*yri+yci*yci;
				zr[i]=(xri*yri+xci*yci)/d;
				zc[i]=(xci*yri-xri*yci)/d;
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				yri=yr[i];
				zr[i]=xr[i]/yri;
				zc[i]=xc[i]/yri;
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				xri=xr[i];
				yri=yr[i];
				yci=yc[i];
				d=yri*yri+yci*yci;
				zr[i]=(xri*yri)/d;
				zc[i]=(-xri*yci)/d;
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]/yr[i];
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd>0)){ //escalar por matriz
		m=1;
		for (i=0;i<y.nd;i++) {
			m*=y.vecDim[i];
		}
		z = new Matriz(y.nd,y.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				yri=yr[i];
				yci=yc[i];
				d=yri*yri+yci*yci;
				zr[i]=(xr*yri+xc*yci)/d;
				zc[i]=(xc*yri-xr*yci)/d;
			}
		} if (x.c && (!y.c)) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			xc=x.complejos[0];
			zc=z.complejos;
			for (i=0;i<m;i++) {
				yri=yr[i];
				zr[i]=xr/yri;
				zc[i]=xc/yri);
			}
		} if ((!x.c) && y.c) {
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			yc=y.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				yri=yr[i];
				yci=yc[i];
				d=yri*yri+yci*yci;
				zr[i]=(xr*yri)/d;
				zc[i]=(-xr*yci)/d;
			}
		} else { //es real puro
			xr=x.reales[0];
			yr=y.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr/yr[i];
			}
		}
		return z;
	} else if ((x.nd>0)&&(y.nd==0)){ //matriz por escalar
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c||y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			yc=y.complejos[0];
			zc=z.complejos;
			d=yr*yr+yc*yc;
			for (i=0;i<m;i++) {
				xri=xr[i];
				xci=xc[i];
				zr[i]=(xri*yr+xci*yc)/d;
				zc[i]=(xci*yr-xri*yc)/d;
			}
		} if (x.c && (!y.c)) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			xc=x.complejos;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]/yr;
				zc[i]=xc[i]/yr;
			}
		} if ((!x.c) && y.c) {
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			yc=y.complejos[0];
			zc=z.complejos;
			d=yr*yr+yc*yc;
			for (i=0;i<m;i++) {
				xri=xr[i];
				zr[i]=(xri*yr)/d;
				zc[i]=(-xri*yc)/d;
			}
		} else { //es real puro
			xr=x.reales;
			yr=y.reales[0];
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=xr[i]/yr;
			}
		}
		return z;
	} else if ((x.nd==0)&&(y.nd==0)){ //escalar por escalar
		z = new Matriz(0,null,x.c || y.c);
		if (x.c && y.c) { //ambos son complejos
			xr=x.reales[0];
			xc=x.complejos[0];
			yr=y.reales[0];
			yc=y.complejos[0];
			d=yr*yr+yc*yc;
			z.reales[0]=(xr*yr+xc*yc)/d;
			z.complejos[0]=(xc*yr-xr*yc)/d;
		} if (x.c && (!y.c)) {
			yr=y.reales[0];
			z.reales[0]=x.reales[0]/yr;
			z.complejos[0]=x.complejos[0]/yr;
		} if ((!x.c) && y.c) {
			xr=x.reales[0];
			yr=y.reales[0];
			yc=y.complejos[0];
			d=yr*yr+yc*yc;
			z.reales[0]=(xr*yr)/d;
			z.complejos[0]=(-xr*yc)/d;
		} else { //es real puro
			z.reales[0]=x.reales[0]/y.reales[0];
		}
		return z;
	} else {
		return null;
	}
}


Matriz.prototype.abs=function(x) {
	var z,m,i,xr,xc,zr,zc;
	
	if (x==null) {
		return null;
	} else if (x.nd==0) { // es escalar
		z = new Matriz(0,null,false);
		if (x.c) { //es complejo
			z.reales[0]=Math.sqrt(x.reales[0]*x.reales[0]+x.complejos[0]*x.complejos[0]);
		} else { //es real
			z.reales[0]=Math.abs(x.reales[0]);
		}
		return z;
	} else if (x.nd>0) {//es matriz
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c);
		if (x.c) { //es complejo
			xr=x.reales;
			xc=x.complejos;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=Math.sqrt(xr[i]*xr[i]+xc[i]*xc[i]);
			}
		} else { //es real
			xr=x.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=Math.abs(x.reales[i]);
			}
		}
		return z;
	} else { //error
		return null;
	}
}


Matriz.prototype.ln=function(x) {
	//ln(z)= ln(abs(z)) + i*fase(z)
	var z,m,i,xr,xc,zr,zc,modulo;
	
	if (x==null) {
		return null;
	} else if (x.nd==0) { // es escalar
		if (x.c) { //es complejo
			z = new Matriz(0,null,true);
			modulo=Math.sqrt(x.reales[0]*x.reales[0]+x.complejos[0]*x.complejos[0]);
			if (modulo>0) {
				z.reales[0]=Math.log(modulo);
				z.complejos[0]=Math.atan2(x.complejos[0],x.reales[0]);
			} else {//error por logaritmo de cero
				return null;
			}
		} else { //es real
			if (x.reales[0]>0) {//es positivo
				z = new Matriz(0,null,false);
				z.reales[0]=Math.log(x.reales[0]);
			} else if(x.reales[0]<0) { //es negativo
				z = new Matriz(0,null,true);
				z.reales[0]=Math.log(-x.reales[0]);
				z.complejos[0]=Math.PI;
			} else { //es cero
				return null;
			}
		}
		return z;
	} else if (x.nd>0) {//es matriz
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,true);
		if (x.c) { //es complejo
			xr=x.reales;
			xc=x.complejos;
			zr=z.reales;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				modulo=Math.sqrt(xr[i]*xr[i]+xc[i]*xc[i]);
				if (modulo>0) {
					zr[i]=Math.log(modulo);
					zc[i]=Math.atan2(xc[i],xr[i]);
				} else {//error por logaritmo de cero
					return null;
				}
			}
		} else { //es real
			xr=x.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				if (xr[i]>0) {//es positivo
					zr[i]=Math.log(xr[i]);
					zc[i]=0;
				} else if(xr[i]<0) { //es negativo
					zr[i]=Math.log(-xr[i]);
					zc[i]=Math.PI;
				} else { //es cero
					return null;
				}
			}
		}
		return z;
	} else { //error
		return null;
	}
}



Matriz.prototype.acos=function(x) {
	//acos(z)=-i*ln(z+i*sqrt(1-z^2))
	//       =-i*ln(z-sqrt((z^2-1)))
	//       =-i*ln(abs(a+i*b+i*sqrt(1-a^2+b^2-i*2*a*b)))+arg((a+i*b)+i*sqrt(1-a^2+b^2-i*2*a*b))
	var z,m,i,xr,xc,zr,zc,xr0;
	
	if (x==null) {
		return null;
	} else if (x.nd==0) { // es escalar
		xr0=x.reales[0];
		if (x.c) { //complejo
			z = new Matriz(0,null,true);
			
			z.reales[0]=????????????
			z.complejos[0]=?????????????
		} else if ((xr0>=-1)&&(xr0<=1)){ //es real y acotado
			z = new Matriz(0,null,false);
			z.reales[0]=Math.acos(xr0);
		} else { //es real y no acotado
			z = new Matriz(0,null,true);
			z.reales[0]=0;
			z.complejos[0]=-Math.log(xr0-Math.sqrt(xr0*xr0-1));
		}
		return z;
	} else if (x.nd>0) {//es matriz
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c);
		if (x.c) { //es complejo
			xr=x.reales;
			xc=x.complejos;
			zr=z.reales;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=????????????????
				zc[i]=????????????????
			}
		} else { //es real
			xr=x.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=???????????????
			}
		}
		return z;
	} else { //error
		return null;
	}
}

/*
cosh(z)=(e^{z}+e^{-z})/2
sinh(z)=(e^{z}-e^{-z})/2

asin(z)=-i*ln(i*x+sqrt(1-z^2))
atan(z)=0.5*i*(ln(1-i*z)-ln(1+i*z))
atan2(x,y)
ceil(x)
cos(a+jb)=cos(a)cosh(b)-j sin(a)sinh(b)
exp(a+jb)=exp(a)*(cos(b)+j*sin(b))
floor(x)

max(z)
min(z)
random(z)
round(x)
sin(a+jb)=sin(a)cosh(b)+j cos(a)sinh(b)
sqrt(z)
tan(z)

*/

/*
determinante
transpuesta
inversa
separacion LU
*/

/* esqueleto
Matriz.prototype.abs=function(x) {
	var z,m,i,xr,xc,zr,zc;
	
	if (x==null) {
		return null;
	} else if (x.nd==0) { // es escalar
		z = new Matriz(0,null,x.c);
		if (x.c) { //es complejo
			z.reales[0]=????????????
			z.complejos[0]=?????????????
		} else { //es real
			z.reales[0]=???????????????
		}
		return z;
	} else if (x.nd>0) {//es matriz
		m=1;
		for (i=0;i<x.nd;i++) {
			m*=x.vecDim[i];
		}
		z = new Matriz(x.nd,x.vecDim,x.c);
		if (x.c) { //es complejo
			xr=x.reales;
			xc=x.complejos;
			zr=z.reales;
			zc=z.complejos;
			for (i=0;i<m;i++) {
				zr[i]=????????????????
				zc[i]=????????????????
			}
		} else { //es real
			xr=x.reales;
			zr=z.reales;
			for (i=0;i<m;i++) {
				zr[i]=???????????????
			}
		}
		return z;
	} else { //error
		return null;
	}
}
*/

